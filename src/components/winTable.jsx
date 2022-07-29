import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

const WinTable = (props) => {
    const prizes = [25, 50, 100, 500, 1000, 5000, 10000, 25000, 50000, 100000, 1000000]

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Breakdown Of Prizes Won</TableCaption>
                <Thead>
                <Tr>
                    {prizes.map(prize => {
                        return prize === 1000000 
                            ? <Th>1 Million</Th>
                            : prize % 1000 <= 1
                            ? <Th>{prize / 1000}k</Th> 
                            : <Th>{prize}</Th>
                    })}
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    {prizes.map(prize => <Td>{JSON.stringify(props.winCategories[prize])}</Td>)}
                </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default WinTable