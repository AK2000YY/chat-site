const Info = () => {
    return (
        <div className="bg-[#110e21] text-white w-[100%] h-[100%] sm:w-[50%] lg:w-[40%] mx-auto mb-3 sm:mb-0 rounded-xl p-4 self-center flex flex-col gap-y-3 overflow-y-auto">
            <h1>I'm Abdulkreem Kourini</h1>
            <p>Full Stack Developer</p>
            <ul className="list-disc">
                <p className="mb-2">Language:</p>
                <li className="ml-4">Kotlin</li>
                <li className="ml-4">JavaScript</li>
                <li className="ml-4">Php</li>
                <li className="ml-4">HTMl</li>
                <li className="ml-4">CSS</li>
            </ul>
            <ul className="list-disc">
                <p className="mb-2">Framworks:</p>
                <li className="ml-4">Jetpack Compose</li>
                <li className="ml-4">React</li>
                <li className="ml-4">Express</li>
                <li className="ml-4">Next</li>
            </ul>
            <ul className="list-disc">
                <p className="mb-2">Database:</p>
                <li className="ml-4">MySql</li>
                <li className="ml-4">Mongodb</li>
            </ul>
            <ul className="list-disc">
                <p className="mb-2">Contact With Me:</p>
                <li className="ml-4">Whatsapp: 0988048552</li>
                <li className="ml-4">Telegram: 0988048552</li>
                <li className="ml-4">Facebook: Abdul Karim Kourini</li>
            </ul>
        </div>
    );
}

export default Info