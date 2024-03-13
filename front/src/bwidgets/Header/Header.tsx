import React from 'react'

import { cn } from '@/shared/lib/utils'

export default function Header({
                                 title,
                                 description,
                                 status
                             }: {
    title?: string
    description?: string
    status?: string
}) {
    return (
        <div className={cn()}>
        </div>
    )
}
