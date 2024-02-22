import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../../../../shared/Loading/Loading";
import NotFound from "../../../../../shared/NotFound/NotFound";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import IndividualProfile from "./IndividualProfile/IndividualProfile";
import IndividualTransactions from "./IndividualTransactions/IndividualTransactions";
import IndividualPoints from "./IndividualPoints/IndividualPoints";
import IndividualPackage from "./IndividualPackage/IndividualPackage";
import IndividualReview from "./IndividualReview/IndividualReview";


const IndividualPGUser = () => {
    const { pgId } = useParams();
    const token = localStorage.getItem('access_token');
    const { data: pg_users = [], isLoading, isError, refetch } = useQuery(['pg_users'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/privilege-users`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return res.json();
    })
    const singlePGUser = pg_users.find(d => (d._id === pgId));

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    return (
        <div className="px-3 xxs:px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-24">
            {
                (singlePGUser !== null) &&
                <Tabs>
                    <TabList>
                        <Tab className='btn btn-xs xs:btn-sm 2xl:btn-md border-none text-gray-950 bg-slate-300 hover:bg-slate-200 xxs:mt-0 xxs:mr-2'>Profile</Tab>
                        <Tab className='btn btn-xs xs:btn-sm 2xl:btn-md border-none text-gray-950 bg-slate-300 hover:bg-slate-200 xxs:mt-0 xxs:mr-2'>Transactions</Tab>
                        <Tab className='btn btn-xs xs:btn-sm 2xl:btn-md border-none text-gray-950 bg-slate-300 hover:bg-slate-200 xxs:mt-0 xxs:mr-2'>Points</Tab>
                        <Tab className='btn btn-xs xs:btn-sm 2xl:btn-md border-none text-gray-950 bg-slate-300 hover:bg-slate-200 xxs:mt-0 xxs:mr-2'>Package Booked</Tab>
                        <Tab className='btn btn-xs xs:btn-sm 2xl:btn-md border-none text-gray-950 bg-slate-300 hover:bg-slate-200 xxs:mt-0 xxs:mr-2'>Review</Tab>
                    </TabList>
                    <TabPanel className="mt-16">
                        <IndividualProfile singlePGUser={singlePGUser}></IndividualProfile>
                    </TabPanel>
                    <TabPanel className="mt-16">
                        <IndividualTransactions singlePGUser={singlePGUser} refetch={refetch}></IndividualTransactions>
                    </TabPanel>
                    <TabPanel className="mt-16">
                        <IndividualPoints singlePGUser={singlePGUser} refetch={refetch}></IndividualPoints>
                    </TabPanel>
                    <TabPanel className="mt-16">
                        <IndividualPackage></IndividualPackage>
                    </TabPanel>
                    <TabPanel className="mt-16">
                        <IndividualReview singlePGUser={singlePGUser}></IndividualReview>
                    </TabPanel>
                </Tabs>
            }
        </div>
    );
};

export default IndividualPGUser;