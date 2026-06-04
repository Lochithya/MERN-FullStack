
export default function ProductCard(props) {

    return (
        <div className="w-[300px] h-[500px] rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-300 p-4">
            
            <img
                src={props.image}
                alt={props.name}
                className="w-full h-56 object-cover rounded-xl"
            />

            <div className="mt-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    {props.name}
                </h1>

                <p className="text-lg text-green-600 font-semibold mt-2">
                    Price: ${props.price}
                </p>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300">
                    View More
                </button>
            </div>

        </div>
    );
}