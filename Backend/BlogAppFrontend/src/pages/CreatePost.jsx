import { Alert, Button, FileInput, Select } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import AutocompleteInput from "../Components/AutocompleteInput";
import { useAutocomplete } from "../hooks/useAutocomplete";

function CreatePost() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  // Content autocomplete
  const {
    suggestion: contentSuggestion,
    isLoading: contentLoading,
    fetchSuggestion: fetchContentSuggestion,
    clearSuggestion: clearContentSuggestion,
  } = useAutocomplete("content");

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {}
  };

  // Strip HTML tags to get plain text for the content suggestion context
  const getPlainText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return div.innerText || div.textContent || "";
  };

  // Accept the content suggestion by appending it to the editor content
  const acceptContentSuggestion = () => {
    if (!contentSuggestion) return;
    const currentContent = formData.content || "";
    // Append as a new paragraph
    const newContent = currentContent + `<p>${contentSuggestion}</p>`;
    setFormData({ ...formData, content: newContent });
    clearContentSuggestion();
  };

  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold ">
          Create a post
        </h1>
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-start">
            <AutocompleteInput
              id="title"
              placeholder="Title"
              required
              value={formData.title || ""}
              onChange={(val) => setFormData({ ...formData, title: val })}
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="uncategorized">Select a category</option>
              <option value="javascript">Javascript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 ">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )}

          {/* Rich text editor */}
          <ReactQuill
            theme="snow"
            placeholder="Write Something..."
            className="h-72 mb-12"
            required
            value={formData.content || ""}
            onChange={(value) => {
              setFormData({ ...formData, content: value });
              clearContentSuggestion();
            }}
          />

          {/* Content autocomplete suggestion */}
          {contentSuggestion && (
            <div className="rounded-lg border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 p-3">
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                ✨ AI Suggestion
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                {contentSuggestion}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={acceptContentSuggestion}
                  className="rounded-md bg-purple-600 px-3 py-1 text-xs font-medium text-white hover:bg-purple-700 transition-colors"
                >
                  ✅ Insert
                </button>
                <button
                  type="button"
                  onClick={clearContentSuggestion}
                  className="rounded-md bg-gray-200 dark:bg-gray-700 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  ✕ Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Content AI suggest button */}
          <div className="flex justify-end -mt-2">
            <button
              type="button"
              onClick={() => fetchContentSuggestion(getPlainText(formData.content))}
              disabled={contentLoading || !formData.content || getPlainText(formData.content).trim().length < 10}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {contentLoading ? "✨ Thinking…" : "✨ AI Continue Content"}
            </button>
          </div>

          <Button type="submit" gradientDuoTone="purpleToPink">
            Publish
          </Button>
          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </>
  );
}

export default CreatePost;
