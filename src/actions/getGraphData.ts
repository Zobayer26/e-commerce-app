import prisma from "@/lib/prisma";
import moment from "moment";


export default async function getGraphData() {
    try {

        const startDate = moment().subtract(6, 'days').startOf('day')
        const endDate = moment().endOf('day')
        const result = await prisma.order.groupBy({
            by: ['createDate'],
            where: {
                createDate: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString()
                },
                status: 'complete'
            },
            _sum: {
                amount: true
            }
        })
        const aggreagatedData: {
            [day: string]: { day: string, date: string, totalAmount: number }
        } = {}
        const currentDate = startDate.clone()
        while (currentDate <= endDate) {
            const day = currentDate.format('dddd')

            aggreagatedData[day] = {
                day, date: currentDate.format('YYYY-MM-DD'),
                totalAmount: 0
            }
            currentDate.add(1, 'day')
        }

        result.forEach((entry) => {
            const day = moment(entry.createDate).format('dddd')
            const amount = entry._sum.amount || 0
            aggreagatedData[day].totalAmount += amount
        })

        const formattedData = Object.values(aggreagatedData).sort((a, b) =>
            moment(a.date).diff(moment(b.date)));
        return formattedData

    } catch (error: any) {
        throw new Error(error)
    }
}