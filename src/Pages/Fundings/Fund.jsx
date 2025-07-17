import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAxios from '../../CustomHooks/useAxios';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';

const Fund = () => {
    const axiosSecure = useAxios();
    const navigate = useNavigate();

    const [funds, setFunds] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const res = await axiosSecure.get(`/funds?page=${page}&limit=10`);
                setFunds(res.data.funds);
                setTotalPages(Math.ceil(res.data.total / 10));
            } catch (error) {
                console.error(error);
            }
        };
        fetchFunds();
    }, [page, axiosSecure]);

    return (
        <section className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-red-600">All Funds</h2>
                <Button onClick={() => navigate('/dashboard/add-fund')}>Add Fund</Button>
            </div>

            <div className="overflow-x-auto rounded border border-gray-200 shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {funds.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                                    No funds found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            funds.map(fund => (
                                <TableRow key={fund._id} className="hover:bg-gray-50">
                                    <TableCell>{fund.userName}</TableCell>
                                    <TableCell>{fund.userEmail}</TableCell>
                                    <TableCell>${fund.amount.toFixed(2)}</TableCell>
                                    <TableCell>{moment(fund.createdAt).format('LLL')}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center mt-4">
                <Pagination
                    total={totalPages}
                    currentPage={page}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </div>
        </section>
    );
};

export default Fund;
