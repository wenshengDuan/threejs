import { Button } from "antd";

const PromiseTest = () => {
  const test1 = () => {
    const awaitPromise = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("error");
        }, 2000);
      });
    };

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("success");
      }, 1000);
    });

    promise
      .then(async (res) => {
        console.log("res", res);
        await awaitPromise();
      })
      .catch((err) => {
        console.log("catch err", err);
      });
  };

  return (
    <Button type="primary" onClick={test1}>
      promise.then await
    </Button>
  );
};

export default PromiseTest;
