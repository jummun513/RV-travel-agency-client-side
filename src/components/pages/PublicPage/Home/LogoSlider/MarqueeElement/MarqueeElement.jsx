import { useQuery } from "react-query";
import styled from "styled-components";
import Loading from "../../../../../shared/Loading/Loading";
import NotFound from "../../../../../shared/NotFound/NotFound";

const MarqueeElement = () => {
  const { data: allPartners = [], isLoading, isError } = useQuery(['allPartners'], async () => {
    const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/partners`);
    return res.json();
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  if (isError) {
    return <NotFound></NotFound>
  }
  return (
    <MarqueeGroup>
      {allPartners.map((el, idx) => (
        <ImageGroup key={idx}>
          <Image onClick={() => window.location.assign(el?.target)} loading="lazy" src={el?.photo?.[0]?.url} alt={el?.companyName + ' image'} />
        </ImageGroup>
      ))}
    </MarqueeGroup>
  );
};

export default MarqueeElement;

const MarqueeGroup = styled.div`
flex-shrink: 0;
display: flex;
align-items: center;
justify-content: space-between;
white-space: nowrap;
`;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  width: 180px;
  margin: 10px 20px;
  @media (max-width: 640px) {
    width: 100px;
    margin: 5px 10px;
  }
`;

const Image = styled.img`
  object-fit: contain;
  background: #fbfbfb;
  width: 100%;
  border-radius: 0.5rem;
  padding: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: 0.5s linear;
  transform: scale(1);
  &:hover{
    transform: scale(1.1);
    cursor: pointer;
  }
  @media (max-width: 640px) {
  padding: 2px;
  border-radius: 0.2rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 1px 4px 0px;
  }
`;