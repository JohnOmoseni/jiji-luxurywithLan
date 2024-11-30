import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/types";
import { setChatLog } from "@/redux/features/chatSlice";
import { AttachFile, Remove, Send } from "@/constants/icons";
import { useSendMessageInChatMutation } from "@/server/actions/messaging";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

function ChatInput() {
  const { chatLog } = useAppSelector((state) => state.chat);
  const [text, setText] = useState("");
  const [sendMessageMutation] = useSendMessageInChatMutation();
  // @ts-ignore
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    if (text === "") {
      textareaRef && textareaRef.current.setAttribute("rows", "1");
    }
  }, [text]);

  const handleRemoveFile = (fileUrl: string) => {
    const index = preview.findIndex((url) => url === fileUrl);
    setPreview((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const selectedFilesArray = Array.from(selectedFiles);
    const validFiles: File[] = [];
    const previewFiles: string[] = [];

    selectedFilesArray.forEach((file) => {
      previewFiles.push(URL.createObjectURL(file));
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setPreview((prevFiles) => [...prevFiles, ...previewFiles]);
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (!text) return;

    const msg = text.trim();
    const chat = {
      type: "msg",
      message: msg,
      outgoing: "true",
      images: preview,
    };

    console.log("TEST", chat, chatLog);

    const chatLogNew = [...chatLog, { ...chat, timestamp: Date.now() }];
    dispatch(setChatLog([...chatLogNew, { loading: true }]));

    setText("");
    setPreview([]);
    setFiles([]);

    return;

    // make http call
    const payload = {
      chat_id: "",
      message: msg,
    };

    try {
      const res = await sendMessageMutation(payload).unwrap();

      console.log("CHAT RESPONSE", res);

      const response = {
        type: "msg",
        message: res?.message,
        incoming: "true",
        timestamp: Date.now(),
      };

      dispatch(
        setChatLog(
          chatLogNew.filter((obj) => {
            if ("loading" in obj && obj.loading) {
              // return false
              return !obj?.loading;
            }
            return true;
          })
        )
      );
      dispatch(setChatLog([...chatLogNew, response]));
    } catch (error) {
      const responseError = {
        type: "error",
        incoming: "true",
        timestamp: Date.now(),
        error: true,
      };

      console.log(`Error: ${error}`);

      const errorArray = [...chatLogNew, responseError];

      dispatch(
        setChatLog(
          chatLogNew.filter((obj) => {
            if ("loading" in obj && obj.loading) {
              // return false
              return !obj?.loading;
            }
            return true;
          })
        )
      );
      dispatch(setChatLog(errorArray));
    }
  };

  const adjustTextAreaHeight = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      // Reset height to calculate scroll height
      textarea.style.height = "auto";

      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
      const maxHeight = lineHeight * 6; // Maximum height for 6 rows

      // Set the new height, capping at maxHeight
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

      // Toggle `overflowY` based on whether content exceeds maxHeight
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    adjustTextAreaHeight();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className={cn(
        "flex-column gap-3 w-full py-2.5 pl-3 pr-4 border-t border-border-100 sm:min-h-[3rem]"
      )}
    >
      <Preview preview={preview} handleRemoveFile={handleRemoveFile} />

      <form className="row-flex relative w-full gap-4" onSubmit={handleSubmit}>
        <div className="row-flex w-full flex-1 gap-3 bg-slate-100 rounded-md py-2.5 px-3">
          <Textarea
            typeof="text"
            ref={textareaRef}
            value={text}
            disabled={false}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            className="remove-scrollbar i-reset p-0 min-h-0 flex-1 resize-none leading-4 !whitespace-pre-wrap shadow-none border-none placeholder:text-base"
          />

          <div title="Attach Files">
            <input type="file" id="file" className="hidden" multiple onChange={handleFileChange} />

            <label htmlFor="file">
              <AttachFile size={24} className="text-grey cursor-pointer" />
            </label>
          </div>
        </div>
        <button type="submit" title="Send" className="icon">
          <Send size={25} className="text-secondary" />
        </button>
      </form>
    </div>
  );
}
export default ChatInput;

const Preview = ({ preview, handleRemoveFile }: { preview: string[]; handleRemoveFile: any }) => {
  return (
    <>
      {preview.length > 0 && (
        <div className="overflow-y-hidden">
          <div className="grid grid-flow-col w-full grid-cols-[repeat(auto-fit,_minmax(4rem,_5rem))]  gap-x-4">
            {preview.map((fileUrl, index) => (
              <div key={index} className="relative w-20 h-16">
                <img
                  src={fileUrl}
                  alt={`Uploaded preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(fileUrl)}
                  className="absolute top-1 right-1 bg-background rounded-full"
                >
                  <Remove className="text-secondary size-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
