import styled from "styled-components";

const row1 = [
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/1.png?updatedAt=1698170313864",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/2.png?updatedAt=1698170314257",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/3.png?updatedAt=1698170314135",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/4.png?updatedAt=1698170314129",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/5.png?updatedAt=1698170314069",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/6.png?updatedAt=1698170314267",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/7.png?updatedAt=1698170314132",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/8.png?updatedAt=1698170314264",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/9.png?updatedAt=1698170314073",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/10.png?updatedAt=1698170314261",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/11.png?updatedAt=1698170317373",
  "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/Partners%20Logo/12.png?updatedAt=1698170317726"
];

const MarqueeElement = () => {
  return (
    <MarqueeGroup>
      {row1.map((el, idx) => (
        <ImageGroup key={idx}>
          <Image loading="lazy" src={el} />
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