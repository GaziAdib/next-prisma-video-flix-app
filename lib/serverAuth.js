import prismadb from '@/lib/prismadb'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

const serverAuth = async (req, res) => {

    const session = await getServerSession(req, res, authOptions);

    if (!session.user) {
        throw new Error('Not Signed In!')
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if (!currentUser) {
        throw new Error('Not Signed In!')
    }

    return { currentUser }

}

export default serverAuth;