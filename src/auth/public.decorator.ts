
import { SetMetadata } from '@nestjs/common'

export const PUBLIC_DECORATOR = 'thisEndpointRequiresNoAuth'
export const Public = () => SetMetadata(PUBLIC_DECORATOR, true)
