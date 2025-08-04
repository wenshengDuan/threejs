import { Flex, Layout, UploadFile, Image } from "antd";
import { Content } from "antd/es/layout/layout";
import { Upload } from "antd";
import { FC, useState, useEffect } from "react";
import svgPath from "../../asset/img/桥梁.svg";
import { ReactComponent as BridgeIcon } from "../../asset/img/桥梁.svg";

const Linear: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handlePaste = (e: ClipboardEvent) => {
    console.log("粘贴事件", e);
  };

  useEffect(() => {
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <Layout>
      <Content style={{ height: "100vh" }}>
        <Flex justify="center" align="center" style={{ height: "200px" }}>
          <div
            style={{
              width: 200,
              height: 20,
              background: "linear-gradient(to right, rgb(255,255,0) 20%, rgb(0,255,255))",
            }}
          ></div>
          <BridgeIcon width={200} height={200} style={{ color: "red" }} />
        </Flex>

        <Flex vertical>
          <Upload.Dragger fileList={fileList} listType="picture-card">
            <p>拖拽上传</p>
          </Upload.Dragger>
        </Flex>

        <Flex vertical>
          <Upload fileList={fileList} listType="picture-circle">
            <p>点击上传</p>
          </Upload>
        </Flex>
      </Content>
    </Layout>
  );
};

export default Linear;
