export type TypeRole = 'admin' | 'user' | undefined

interface User {
	_id: string

	email: string
	isAdmin: boolean
}

export interface SwaggerAuth {
	refreshToken: string
	accessToken: string
}
