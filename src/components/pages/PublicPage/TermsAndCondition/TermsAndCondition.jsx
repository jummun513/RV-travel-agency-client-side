import { Helmet } from 'react-helmet';
import url from '../../../../assets/images/terms-and-conditions.svg';

const TermsAndCondition = () => {
    return (
        <div className="bg-[#fbfbfb] pb-32 pt-[140px] xxs:pt-[192px] lg:pt-[202px] xl:pt-[228px] 3xl:pt-[234px]">
            <Helmet>
                <title>Terms & Conditions - Royal Venture Limited</title>
            </Helmet>
            <div className="mx-auto max-w-screen-3xl px-2 xxs:px-[16px] sm:px-[32px] 2xl:px-[20]">
                <div className='flex flex-col lg:flex-row items-center'>
                    <div className='lg:w-[50%] lg:mr-10'>
                        <img loading="lazy" src={url} alt="terms and condition" />
                    </div>
                    <div className='mt-24 xs:mt-32 lg:mt-0 lg:w-[50%] lg:ml-10'>
                        <h2 className='text-center lg:text-left text-base xxs:text-xl xs:text-2xl md:text-4xl 3xl:text-5xl font-bold text-black mb-5 xs:mb-7 md:mb-10'>Terms And Conditions</h2>
                        <p className='text-gray-600 text-justify 3xl:text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, voluptatum tempore, qui architecto eligendi incidunt nostrum veritatis obcaecati debitis veniam iusto voluptatibus accusantium quam, ipsam totam deserunt accusamus illo soluta. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit doloribus unde ad. Accusantium, unde. Necessitatibus eos dignissimos iste quisquam est, possimus eveniet, facilis soluta laudantium rem voluptas inventore. Perspiciatis qui fugiat laboriosam adipisci dolorem ut quos molestiae nihil sit culpa possimus quae recusandae assumenda, modi veniam maxime quisquam at? Dignissimos nobis magnam cumque veritatis! Cum eum molestias modi provident nostrum, non velit nesciunt eveniet dolorum cumque ipsam facere sint at. Laboriosam vero eaque illum quae, voluptates dicta voluptatem quo minus provident aliquid veniam in quod laborum dignissimos natus doloremque repudiandae est quia consequatur similique minima? Accusamus iusto non obcaecati maxime.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndCondition;