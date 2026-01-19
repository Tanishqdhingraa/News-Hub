import amqp from "amqplib"

export async function Postednewsproducer(email , message) {
    try {
        const connection = await amqp.connect("amqp://admin:admin123@localhost:5672")
        const channel = await connection.createChannel()

        const routingkey = 'postroutingkey'
        const queue = 'postqueue'
        const exchange = 'postexchange'

        await channel.assertExchange(exchange, 'direct', { durable: true })
        await channel.assertQueue(queue, { durable: false })
        await channel.bindQueue(queue, exchange, routingkey) // ✅

        channel.publish(
            exchange,
            routingkey,
            Buffer.from(JSON.stringify(message))
        )

        console.log('✅ Producer is running successfully')
    } catch (error) {
        console.log('❌ Producer error:', error.message)
    }
}
