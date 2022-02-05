import Image from "next/image";
import { useRecoilState } from "recoil";
import { clickedImageState, openState } from "../atom/atoms";

const images = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png"];

const Modal: React.VFC = () => {
  const [showModal, setShowModal] = useRecoilState(openState);
  const [clickedImage, setClickedImage] = useRecoilState(clickedImageState);

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Modal Title</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="flex justify-center items-center relative p-6 flex-auto">
                {images.map((image) => (
                  <Image
                    alt="pic"
                    key={image}
                    src={image}
                    width={148}
                    height={148}
                    onClick={() => {
                      setClickedImage(image);
                      console.log("clicked: " + image);
                      setShowModal((flag) => !flag);
                    }}
                  />
                ))}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal((flag) => !flag)}
                >
                  Close
                </button>
                {/* <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
};

export default Modal;
