import * as zip from "@zip.js/zip.js";

export default async function importDocx(files) {
  const mediaUrl = 'shit';

  // Read .docx file
  const fileReader = new zip.ZipReader(new zip.BlobReader(files[0]));
  const zipFiles = await fileReader.getEntries();
  const parser = new DOMParser();

  // Read the main text xml
  const mainFile = zipFiles.filter((file) => file.filename.endsWith('word/document.xml'))[0];
  const mainFileContent = await mainFile.getData(new zip.TextWriter());
  const content = parser.parseFromString(mainFileContent, 'text/xml')
    .getElementsByTagName('w:body')[0].childNodes;

  // Read the attachment relations xml
  const relsFile = zipFiles.filter((file) => file.filename.endsWith('document.xml.rels'))[0];
  const relsFileContent = await relsFile.getData(new zip.TextWriter());
  const rels = parser.parseFromString(relsFileContent, 'text/xml').getElementsByTagName('Relationships')[0].childNodes;
  let relationMap = {};
  rels.forEach((rel) => {
    if (rel.getAttribute) {
      relationMap[rel.getAttribute('Id')] = rel.getAttribute('Target')
    }
  })

  // Read the paragraph styles xml
  const stylesFile = zipFiles.filter((file) => file.filename.endsWith('word/styles.xml'))[0];
  const stylesFileContent = await stylesFile.getData(new zip.TextWriter());
  let headers = [];
  parser.parseFromString(stylesFileContent, 'text/xml')
    .querySelectorAll('*|style[*|type="paragraph"]')
    .forEach((styleItem) => {
      const styleName = styleItem.getAttribute('w:styleId');
      headers[styleName] = styleItem.querySelector('*|name').getAttribute('w:val');
    });

  // Iterate through the content paragraphs
  let chapters = [];
  let chapter = {title: '', text: ''};
  let images = [];
  content.forEach((paragraph) => {
    // Table
    if (paragraph.tagName === 'w:tbl') {
      let table = document.createElement('table');
      table.classList.add('table')
      Array.from(paragraph.getElementsByTagName('w:tr')).forEach((tableRow) => {
        let row = document.createElement('tr');
        Array.from(tableRow.getElementsByTagName('w:tc')).forEach((tableData) => {
          row.insertAdjacentHTML('beforeend', `<td>${tableData.textContent}</td>`)
        })
        table.appendChild(row)
      })
      chapter.text += '\n' + table.outerHTML;
    } else {
      // Text or title
      const textContent = paragraph.textContent.trim().replace(RegExp('\s\s+', 'g'), ' ');
      if (textContent !== '') {
        const styleItem = paragraph.querySelector('*|pStyle');
        const paragraphStyle = styleItem ? styleItem.getAttribute('w:val') : '';
        if (headers[paragraphStyle] && headers[paragraphStyle].toLowerCase().indexOf('heading') !== -1) {
          if (chapter.title !== '' || chapter.text !== '') {
            chapters.push(chapter);
            chapter = {title: '', text: ''};
          }
          chapter.title = paragraph.textContent;
        } else {
          chapter.text += `\n<p class="paragraph">${textContent}</p>`;
        }
      }
      // Image
      Array.from(paragraph.getElementsByTagName('w:drawing')).forEach((drawing) => {
        const imageId = drawing.getElementsByTagName('a:blip')[0].getAttribute('r:embed')
        const imageFileName = relationMap[imageId].endsWith('.emf') ? relationMap[imageId].slice(0, -4) + '.svg' : relationMap[imageId];
        chapter.text += `\n<img style="width: 50vw;" src="${mediaUrl}/word/${imageFileName}">`;
        images.push('word/' + relationMap[imageId])
      });
    }
  });

  if (chapter.title !== '' || chapter.text !== '') {
    chapters.push(chapter);
  }

  return [chapters, images];
}
