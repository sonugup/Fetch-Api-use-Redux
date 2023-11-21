import styled from "@emotion/styled";
import React from "react";
import FilterSort from "../Components/FilterSort";
import MusicAlbums from "../Components/MusicAlbums";

function MusicRecords() {
  return (
    <Wrapper color="green">
      <WarpperFilterSort>
        <FilterSort />
      </WarpperFilterSort>
      <WarpperMusicAlbum>
        <MusicAlbums />
      </WarpperMusicAlbum>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: ${({color}) => `1px solid ${color}` } ;
  display: flex;
  height: 100vh;
`;

const WarpperFilterSort = styled.div`
  width: 200px;
  border: 1px solid black;
`;
const WarpperMusicAlbum=styled.div`
border:1px solid blue;
width:100%;
display:grid;
grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
// grid-template-columns:repeat(3, 1fr);
// grid-template-row:auto;
justify-content:center;
grid-gap:20px;
`

export default MusicRecords;
