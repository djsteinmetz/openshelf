import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
    return res.status(200).json({env: process.env.NODE_ENV})
}

export default handler
