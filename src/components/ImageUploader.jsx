import { useState } from 'react';
import { transcribeImage, states } from '../utils/transcribeImage';

export default function ImageUploader() {
    const [imgUrl, setImgUrl] = useState(null);

    function uploadImage(e) {
        console.log('tes');
        const chosenImg = e.target.files[0];
        setImgUrl(URL.createObjectURL(chosenImg))
        transcribeImage(imgUrl)
        console.log(states);
    }

    return (
        <>
            <section className='container mx-auto'>
                <h1 className='text-2xl font-semibold'>Upload Your Bill</h1>
                <input type="file" accept="image/jpeg" onChange={e => uploadImage(e)} className='mt-4 rounded-md p-4' />
                <img src={imgUrl} alt='bill thumbnail' className='w-16' />
            </section>
        </>
    );
}
