import React, { useState } from 'react';
import { Upload, notification, Button } from 'antd';
import { RcFile } from 'antd/lib/upload';
import normsApi from '../../../services/api/norms';
import Layout from '../../../common/Layout';
import importDocx from './importDocx';

export default function ImportNorm() {
  const [files, setFiles] = useState<RcFile[]>([]);

  const dropFile = (file: RcFile) => {
    setFiles([file]);
    return false;
  };

  const submitForm = async (event: any) => {
    event.preventDefault();
    const [chapters, images] = await importDocx(files);
    console.log(chapters, images);
    const response = await normsApi.upload({ condo: 1, norms: chapters });
    console.log(response);
  };

  return (
    <Layout className="import-norm-page">
      <h1>Upload de norma</h1>
      <form onSubmit={submitForm}>
        <Upload.Dragger beforeUpload={dropFile} accept=".docx">
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Upload.Dragger>
        <Button htmlType="submit">OK</Button>
      </form>
    </Layout>
  );
}
