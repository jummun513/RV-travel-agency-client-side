

const data1 = [
    { id: 1, heading: 'Name', value: 'Jummun Islam' },
    { id: 2, heading: 'Account Number', value: 'rv-12345' },
    { id: 3, heading: 'Privileged Account No', value: 'rv-12345' },
    { id: 4, heading: 'Email', value: 'jummunislam513@gmail.com' },
    { id: 5, heading: 'Gender', value: 'Male' },
    { id: 6, heading: 'Date Of Birth', value: '03 November, 1999' },
    { id: 7, heading: 'Anniversary Date', value: '03 November, 2026' },
    { id: 8, heading: 'NID No', value: '11255456132156456' },
    { id: 9, heading: 'Mobile No', value: '01794094122' },
    { id: 10, heading: 'Phone', value: '031-015452' },
    { id: 11, heading: 'Balance (Point)', value: '90' },
    { id: 12, heading: 'Balance Amount', value: '95000' },
    { id: 13, heading: 'Expired Date', value: '27 August, 2024' },
    { id: 14, heading: 'Blood Group', value: 'O+' },
    { id: 15, heading: 'Occupation', value: '' },
    { id: 16, heading: 'Work Place', value: '' },
    { id: 17, heading: 'Office Contact', value: '' },
    { id: 18, heading: 'Sining Date', value: '03 May, 2023' },
    { id: 19, heading: 'Passport No', value: '' },
    { id: 20, heading: 'Passport Validity', value: '' },
    { id: 23, heading: 'Present Address', value: '' },
    { id: 24, heading: 'Permanent Address', value: '' },
    { id: 21, heading: 'City', value: 'Chittagong' },
    { id: 22, heading: 'Country', value: 'Bangladesh' },
    { id: 25, heading: 'Remark', value: 'Only service payment is not refundable. Validity date of this service is 5 years' },
]

const data2 = [
    { id: 1, heading: 'Wife', value: [{ name: 'abc xyz' }, { birth: '03 November, 1999' }, { age: '23 years 11 months 10 days' }] },
    { id: 2, heading: 'Daughter', value: [{ name: 'opq rst' }, { birth: '03 November, 2099' }, { age: '18 years 11 months 10 days' }] },
]


const Profile = () => {
    return (
        <div className="px-3 xxs:px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-24">
            <div className="mb-24 xl:mb-32">
                <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 xxs:mb-10">Profile Details</h2>

                <div className="mt-10 lg:mt-16">
                    <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                                {
                                    data1.map((d, i) => {
                                        return (
                                            <tr key={i} className="bg-white border-b w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                    {d.heading}
                                                </th>
                                                <td className="px-6 py-4 text-gray-800 w-1/12">
                                                    :
                                                </td>
                                                <td className="px-6 py-4 text-gray-800">
                                                    {d.value}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mb-24 xl:mb-32">
                <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 xxs:mb-10">Dependent Information</h2>

                <div className="mt-10 lg:mt-16">
                    <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                                {
                                    data2.map((d, i) => {
                                        return (
                                            <tr key={i} className="bg-white border-b w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                    {d.heading}
                                                </th>
                                                <td className="px-6 py-4 text-gray-800 w-1/12">
                                                    :
                                                </td>
                                                <td className="px-6 py-4 text-gray-800">
                                                    {
                                                        d.value.map((x, y) =>
                                                            <div key={y}>
                                                                {
                                                                    (x.name ? <p><span className="font-semibold">Name:</span> {x.name}</p> :
                                                                        (x.birth ? <p><span className="font-semibold">Date Of Birth:</span> {x.birth}</p> : <p><span className="font-semibold">Age:</span> {x.age}</p>))
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mb-32 xl:mb-14">
                <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 xxs:mb-10">Guest Documents</h2>

                <div className="mt-10 lg:mt-16">
                    <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                                <tr className="bg-white border-b w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Download
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <a href="">Download Now</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;