import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';

export default function Home() {

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (rating === 5) {
      const modalCheckbox = document.getElementById('my_modal_7');
      const audio = new Audio('/music/GGGeming.mp3');

      modalCheckbox.checked = true;
      audio.play();

      const closeModalListener = () => {
        if (!modalCheckbox.checked) {
          audio.pause();
          setRating(null)
        }
      };

      modalCheckbox.addEventListener('change', closeModalListener);

      setTimeout(() => {
        audio.pause();
        modalCheckbox.checked = false;
        setRating(null)
        modalCheckbox.removeEventListener('change', closeModalListener);
      }, 194400);

      return () => {
        modalCheckbox.removeEventListener('change', closeModalListener);
      };
    } else if (rating && rating < 5) {
      const modal = document.getElementById('modal_bintang_rendah');

      modal.checked = true;
      const closeModalListener = () => {
        if (!modal.checked) {
          setRating(null)
        }
      };

      modal.addEventListener('change', closeModalListener);

      setTimeout(() => {
        modal.checked = false;
        setRating(null)
        modal.removeEventListener('change', closeModalListener);
      }, 10000);
      return () => {
        modal.removeEventListener('change', closeModalListener);
      };
    }
  }, [rating]);

  const handleRating = async (index) => {
    setRating(index);

    await axios.post('/api/poin', {
      poin: index
    })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-[#fff] shadow-xl">
        <figure className="px-10 pt-10">
          <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Berikan kami nilai</h2>
          <p className="text-xs">Kalo bintang lima ntar ada musiknya</p>
          <div className="card-actions justify-center w-full">
            {[...Array(5)].map((star, index) => {
              const currentIndex = index + 1

              return (
                <label className="" key={index}>
                  <input
                    type="radio"
                    name="rating"
                    className="hidden"
                    value={currentIndex}
                    onClick={() => handleRating(currentIndex)}

                  />
                  <FaStar
                    size={40}
                    color={currentIndex <= (hover || rating) ? "#EE7214" : "#000"}
                    onMouseEnter={() => setHover(currentIndex)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>

              )
            })}

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box bg-white">
                <h3 className="text-lg font-bold uppercase">gege geming</h3>
                <div className="flex justify-center items-center">

                  <Image
                    width={100}
                    height={100}
                    src={"/windah.gif"} />
                </div>
                <p className="py-4">Terimakasihh bintang limanya!</p>
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>


            <input type="checkbox" id="modal_bintang_rendah" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box bg-white">
                <h3 className="text-lg font-bold uppercase">Terimakasih</h3>
                <div className="flex justify-center items-center">

                </div>
                <p className="py-4">Terimakasihh bintangnya!</p>
              </div>
              <label className="modal-backdrop" htmlFor="modal_bintang_rendah">Close</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
