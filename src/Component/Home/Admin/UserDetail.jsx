import { useData } from "../../../context/myContext";

const UserDetail = () => {
    const { getuser } = useData()
    console.log(getuser)
    return (
        <div>
            <div>
                <div className="py-5 flex justify-between items-center">
                    {/* text  */}
                    <h1 className=" text-xl text-secondary font-bold">All User</h1>
                </div>

                {/* table  */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                        <tbody>
                            <tr>
                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-white bg-secondary font-bold fontPara">
                                    S.No.
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-white bg-secondary font-bold fontPara">
                                    Name
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-white bg-secondary font-bold fontPara">
                                    Email
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-white bg-secondary font-bold fontPara">
                                    Uid
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-white bg-secondary font-bold fontPara">
                                    Role
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-white bg-secondary font-bold fontPara">
                                    Date
                                </th>

                            </tr>

                            {getuser.map((item, index) => {

                                return (

                                    <tr className="text-pink-300" key={index}>
                                        <td
                                            className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-black text-black ">
                                            {index + 1}
                                        </td>

                                        <td
                                            className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-black text-black first-letter:uppercase ">
                                            {item.name}
                                        </td>

                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-black text-black cursor-pointer ">
                                            {item.email}
                                        </td>

                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-black text-black cursor-pointer ">
                                            {item.uid}
                                        </td>

                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-black text-black cursor-pointer ">
                                            {item.role}
                                        </td>

                                        <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-black text-black cursor-pointer ">
                                            {item.date}
                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;