// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { ReactComponent as PlusIcon } from "../../assets/main/icon/Plus.svg";
import miscSlice from "../../store/miscSlice";
import PropTypes from "prop-types";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ImagePicker = ({ onChange, edit, editImage }) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(
    edit ? (editImage ? editImage : null) : null
  );
  const fileInputRef = useRef(null);
  const imgUpload = miscSlice((state) => state.imgUpload);
  const maxSize = 1024 * 1024 * 3;

  const openFileDialog = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // function to  select
  const handleFileSelection = (files) => {
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];

    if (!file.type.match(imageMimeType)) {
      alert("Invalid Image");
      return;
    }
    if (file.size > maxSize) {
      alert("File size exceeds the maximum allowed size (3MB).");
      return;
    }
    setFile(file);
  };

  //function to upload img to api and return url string
  const handleUpload = () => {
    if (!file) {
      return;
    }

    imgUpload({ image: file })
      .then((response) => {
        onChange(response.data.data.url);
      })
      .catch((error) => {
        console.error(error);
        alert("Error uploading image");
      });
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();

      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  //watch for file changes and upload to api
  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  return (
    <>
      <div className="imagePicker__form">
        <label
          htmlFor="image"
          className="imagePicker__label"
          onClick={openFileDialog}
        >
          <PlusIcon />

          <input
            ref={fileInputRef}
            type="file"
            id="image"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => handleFileSelection(e.target.files)}
            className="imagePicker__input"
            style={{ display: "none" }}
          />

          {fileDataURL ? (
            <p className="imagePicker__p-previewer">
              {<img src={fileDataURL} alt="preview" />}
            </p>
          ) : null}
        </label>
      </div>
    </>
  );
};

ImagePicker.propTypes = {
  onChange: PropTypes.func,
  edit: PropTypes.bool,
  editImage: PropTypes.string,
};
export default ImagePicker;
