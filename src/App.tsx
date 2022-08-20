import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Qr from "./assets/qr.jpg";
import { GenerateQRCode } from "./assets/utils";

interface Form {
  url: string;
  size: string;
}
const initialValues: Form = {
  url: "",
  size: "300",
};
const validationSchema = Yup.object().shape({
  url: Yup.string().min(2, "Too Short!").required("Required"),
  size: Yup.string().required("Required"),
});

function App() {
  const [QRUrl, setQRUrl] = useState("");

  const onSubmit = async ({ url, size }: Form) => {
    const data: any = await GenerateQRCode({ url, size });
    setQRUrl(data);
    resetForm();
  };

  const {
    handleChange,
    values,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
    validateOnBlur: true,
  });

  const getError = (key: any) => {
    //@ts-ignore
    return touched[key] && errors[key];
  };
  return (
    <div className="font-primary bg-[#FCFAF0] min-h-[100vh]">
      <div className="h-[70px] bg-[#99B0B0] text-white flex items-center">
        <div className="w-[80%] mx-auto">
          <p className="text-[30px]">QrCode Generator</p>
        </div>
      </div>
      <div className="w-[80%] mx-auto flex sm:flex-row flex-col items-center justify-between">
        <div className="sm:w-[48%] w-[100%]">
          <div className="mt-[4em]">
            <p className="text-[24px] font-light">
              Qr codes allows smartphone users to access your website simply and
              quickly.
            </p>
            <p className="mt-[1em] font-light">
              Enter your URL below to generate a QR code and download the image.
            </p>
          </div>

          <div className="mt-[2em]">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:w-[300px] w-[100%]">
                <label htmlFor="">URL</label>
                <input
                  type="text"
                  name="url"
                  value={values.url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[1px] border-grey-500 h-[50px] rounded-[5px] my-2 pl-[1em] focus:outline-none "
                />
                <p className="text-[12px] text-red-500 focus:outline-none font-light">
                  {getError("url")}
                </p>
              </div>

              <div className="mt-[2em] flex flex-col sm:w-[300px] w-[100%]">
                <label htmlFor="">Size</label>
                <select
                  name="size"
                  value={values.size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[1px] border-grey-500 h-[50px] rounded-[5px] my-2 pl-[1em]"
                >
                  <option value="100">100 x 100</option>
                  <option value="200">200 x 200</option>
                  <option value="300">300 x 300</option>
                  <option value="400">400 x 400</option>
                  <option value="500">500 x 500</option>
                  <option value="600">600 x 600</option>
                  <option value="700">700 x 700</option>
                  <option value="800">800 x 800</option>
                </select>
                <p className="text-[14px] font-light">{getError("size")}</p>
              </div>

              <button
                type="submit"
                className="h-[50px] rounded-[5px] bg-[#B5B2B0] sm:w-[300px] w-[100%] mt-[2em] text-[14px] font-light"
              >
                Generate
              </button>
            </form>
          </div>
        </div>

        <div className="sm:w-[48%] w-[100%] sm:mt-[0] mt-[2em]">
          <img src={Qr} alt="Qr" className="w-[100%] rounded-[10px]" />
        </div>
      </div>

      <div className="w-[80%] mx-auto mt-[2.5em] pb-[2em]">
        <p className="font-light">Generated QR Code is:</p>
        {QRUrl ? (
          <img src={QRUrl} alt="QRUrl" className="mt-[1em]" />
        ) : (
          <div className="h-[300px] w-[300px] bg-[#B5B2B0] text-white font-light text-[14px] flex items-center justify-center p-[2em] text-center mt-[1em] rounded sm:mx-0 mx-auto">
            Input Your URL Above , and Click Generate
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
