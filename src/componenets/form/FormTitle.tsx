const FormTitle = ({ title, description }: {
    title: string,
    description: string
}) => {
    return (
        <div>
            <h1
                className="text-white font-sans font-normal text-4xl mb-5"
            >
                {title}
            </h1>
            <p
                className="text-gray-500 font-sans font-light text-2xl"
            >
                {description}
            </p>
        </div>
    )
}

export default FormTitle