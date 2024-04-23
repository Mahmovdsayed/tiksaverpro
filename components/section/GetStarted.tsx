interface IProps {

}
const GetStarted = ({ }: IProps) => {
    return <>
        <h2 className="my-3 text-2xl font-semibold text-pink-500">Get Started</h2>
        <div className="flex flex-col justify-center items-center text-sm font-semibold text-default-500">
            <span>1. Paste the TikTok video link.</span>
            <span>2. Click 'Download' and enjoy high-quality videos.</span>
            <span>3. No watermark, no hassle. Download now!</span>
        </div>

    </>;
};

export default GetStarted;