import React from 'react';
import ImageUploader from 'react-images-upload';
import config from '../config';
import { useHistory } from "react-router-dom";


export default function Admin () {
    const history = useHistory();
    const state = {
        price: 0,
        order: 0,
        name: null,
        thumbnail: null,
        images: [],
        stls: []
    }

    function onDropImages(files) {
        state.images = files.target.files;
    }

    function onDropThumbnail(files) {
        state.thumbnail = files.target.files[0];
        
    }

    function onDropStls(files) {
        state.stls = files.target.files;
    }

    function onSubmit(e) {
        e.preventDefault()
        const data = new FormData()
        for(var x = 0; x<state.stls.length; x++) {
            data.append('stls', state.stls[x])
        }

        for(var x = 0; x<state.images.length; x++) {
            data.append('images', state.images[x])
        }

        data.append('thumbnail', state.thumbnail)
        data.append('price', state.price)
        data.append('order', state.order)
        data.append('name', state.name)


        fetch(`${config.server_url}/api/create`, {
            method: 'post',
            body: data
            // headers: {"Content-type": "multipart/form-data"}
        }).then(() => {
            history.push("/");
            window.location.reload(); 
        })

        return false;
    }

    return (<div  className="content " >
        <div className="admin product">
        <form action="submit" onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">
        <div className="flex-horizontal">
            <div className="container form-details">
                <div>
                    <label>price:</label>
                    <input type="number" onChange={(e)=> {e.preventDefault(); state.price = e.target.value}}/>
                </div>
                <div>
                    <label>order:</label>
                    <input type="number" onChange={(e)=> {e.preventDefault(); state.order = e.target.value}}/>
                </div>
                <div>
                    <label>name:</label>
                    <input type="text" onChange={(e)=> {e.preventDefault(); state.name = e.target.value}}/>
                </div>
            </div>
            <div className="container form-details">
                <div>
                    <label>thumbnail:</label>
                </div>
                <div>
                    <label>product images:</label>
                </div>
                <div>
                    <label>STL files:</label>
                </div>
            </div>
            <div className="container form-details">
                <div>
                    <input type="file" name="thumbnail"  onChange={onDropThumbnail}/>
                
                </div>
                <div>
                    <input type="file" name="images" multiple  onChange={onDropImages}/>

                </div>
                <div>
                    <input type="file" name="stls" multiple  onChange={onDropStls}/>
                
                </div>
            </div>
        </div>
        <div>
            <input type="submit"></input>
        </div>
    </form>
    </div>
</div>)
}