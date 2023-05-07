const MobileMenu = ({ visible }) => {

    if (!visible) {
        return null;
    }

    return (
        <div className="bg-black w-56 absolute top-8 left-8 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-4">
                <div className="px-3 text-center text-white hover:und
               ">
                    Home
                </div>

                <div className="px-3 text-center text-white hover:und
               ">
                    Series
                </div>

                <div className="px-3 text-center text-white hover:und
               ">
                    Films
                </div>

                <div className="px-3 text-center text-white hover:und
               ">
                    New & Popular
                </div>

                <div className="px-3 text-center text-white hover:und
               ">
                    My List
                </div>

                <div className="px-3 text-center text-white hover:und
               ">
                    Browse by Languages
                </div>
            </div>
        </div>
    )

}

export default MobileMenu