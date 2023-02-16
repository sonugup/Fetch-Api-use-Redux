import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../react-redux/store';
import {getMusicRecord} from '../react-redux/action'
import {useLocation, useSearchParams } from 'react-router-dom';

const MusicAlbums = () => {
    const dispatch=useDispatch();
const [searchParams]=useSearchParams();
    const musicAlbum=useSelector((store) => store.albumMusic);

    const location=useLocation();
    console.log(location)
    useEffect(() => {
      if(location || musicAlbum.length==0){
        const genre=searchParams.getAll('genre')
        const queryParams={
          params:{
            genre:genre,
            _sort:searchParams.get('sortBy') && 'year',
            _order:searchParams.get('sortBy'),
          }
        }
      dispatch(getMusicRecord(queryParams));
      }
      
    }, [location.search])
    console.log(musicAlbum)
  return (
    <div>
      {
        musicAlbum.length> 0 && musicAlbum.map((albums) => {
            return (
                <div key={albums.id}>
                    <div>{albums.name} </div>
                    <div>
                    <img src={albums.img} alt={albums.name}/>

                    </div>
                    <div>
                      {albums.genre}
                    </div>
                    <div>{albums.year} </div>
                </div>
            )
        })
      }
    </div>
  )
}

export default MusicAlbums
