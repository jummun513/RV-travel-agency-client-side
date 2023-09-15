import styled from 'styled-components';
import backVideo from '../../../../assets/videos/bannerVideo.mp4'

const Banner = () => {
    return (
        <Container className='h-[50vh] xl:h-[60vh] 2xl:h-[70vh] top-[45px] xxs:top-[64px] lg:top-[74px] 2xl:top-[90px] 3xl:top-[106px]'>
            <Video autoPlay muted loop id="background-video">
                <source src={backVideo} type="video/mp4" />
            </Video>
            <OverLay className='bg-[#0005]'></OverLay>
            <Content>
                <h1>Welcome to My Website</h1>
                <p>Discover amazing content!</p>
            </Content>
        </Container>
    );
};

export default Banner;

const Container = styled.div`
position: relative;
  overflow: hidden;
  z-index: 10;
`

const Video = styled.video`
position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const OverLay = styled.div`
position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const Content = styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    color: #fff;
    padding: 100px 0;
`