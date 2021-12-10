import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import classes from './FileUploadPreview.module.css'
import AvatarIcon from '../../assets/avatarIcon.jpg'

function FileUploadPreview({ htmlFor, src = null, alt = "", file, setFile, icon = AvatarIcon, accept, deleteBtn = null }) {

    const fileInputRef = useRef(null);

    const [img, setImg] = useState(null)

    const handleFileInputChange = (event) => {
        if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
            setFile(fileInputRef.current.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    }

    useEffect(() => {
        if (!file) {
            setImg(null)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setImg(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    return (
        <div className={classes.root}>
            <label htmlFor={htmlFor} className={classes.label}>
                {/* {src && <img src={src} alt={alt} />

            } */}

                <div className={classes.previewFile}>
                    {
                        img ? <img src={img} alt={alt} /> :
                            src ?
                                <img src={src} alt={alt} />
                                :
                                <img src={icon} alt={alt} />}
                </div>
                <div className={`${classes.btnRow} row aic jcsb`}>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        onClick={handleClick}
                    >
                        Load Avatar
                    </Button>
                    {
                        deleteBtn &&
                        <Button
                            className={classes.btn}
                            variant="contained"
                            style={{ background: '#e94200' }}
                            onClick={e => {
                                deleteBtn()
                                setImg(null)
                            }}
                        >
                            Delete Avatar
                        </Button>
                    }
                </div>

                <input
                    accept={accept}
                    id={htmlFor}
                    type="file"
                    className={classes.input}
                    onChange={handleFileInputChange}
                    ref={fileInputRef}
                />
            </label>
        </div>
    )
}

export default FileUploadPreview