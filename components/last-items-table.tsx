import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchItemsByOwnerId } from '@/lib/items-data';

export async function LastItemsTable({ userId, totalItems }: { userId: string; totalItems?: number }) {
  const { data: latestItems } = await fetchItemsByOwnerId({ ownerId: userId });

  return (
    <Table>
      <TableCaption>A list of your latest items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=''>ID</TableHead>
          <TableHead className=''>Title</TableHead>
          <TableHead className=''>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {latestItems?.map((item) => (
          <TableRow key={item.id} className='table-row break-all'>
            <TableCell className='table-cell text-ellipsis font-medium'>{item.id}</TableCell>
            <TableCell className='text-clip'>{item.title}</TableCell>
            <TableCell className='text-clip'>AA</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className='table-row break-all'>
          <TableCell>Displaying {latestItems?.length}</TableCell>
          <TableCell colSpan={2}>Total {totalItems || 0}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
