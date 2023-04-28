import axios from "axios";
import { Copy } from "@phosphor-icons/react";
import Head from "next/head";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const ApiKey = "b381974fc9a1f9869080032425bee2de86753581";

  const generateShortUrl = async () => {
    if (url.includes("https://") || url.includes("http://")) {
      await axios
        .post(
          "https://api-ssl.bitly.com/v4/shorten",
          {
            long_url: url,
            custom_bitlink: customUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${ApiKey}`,
            },
          }
        )
        .then((response) => {
          setShortUrl(response.data.link);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function handleCopyButtonClick() {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Valor copiado com sucesso!");
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-rose-800">
      <ToastContainer />
      <div className="flex flex-col items-center w-full mb-4 text-container">
        <h1 className="text-8xl font-bold mb-28 text-white">
          t<span className="text-green-500">Url</span>l.io
        </h1>
      </div>
      <div className="flex flex-col items-center text-center w-full mb-4">
        <label htmlFor="input1" className="mb-2 font-bold text-lg text-white">
          Link para ser encurtado
        </label>
        <input
          type="text"
          id="input1"
          className="w-3/5 border border-gray-400 p-2 rounded-md text-rose-950"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
      </div>
      <div className="flex flex-col items-center text-center justify-center w-full mb-4">
        <label htmlFor="input2" className="mb-2 font-bold text-lg text-white">
          Personalização do link (opcional)
        </label>
        <input
          type="text"
          id="input2"
          className="border w-1/5  border-gray-400 p-2 rounded-md text-rose-950"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          generateShortUrl();
        }}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mb-10 rounded"
      >
        Continuar
      </button>
      <div className="w-5/6 bg-gray-100 p-4 rounded-lg flex items-center gap-4 justify-center">
        <input
          type="text"
          value={shortUrl}
          onChange={(e) => {
            setShortUrl(e.target.value);
          }}
          className="p-4 rounded-lg w-full text-slate-950"
          readOnly
        />
        <div className="flex items-center justify-center">
          <Copy
            size={32}
            color="rgb(34 197 94)"
            className="cursor-pointer hover:scale-110 transition-all"
            onClick={handleCopyButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
