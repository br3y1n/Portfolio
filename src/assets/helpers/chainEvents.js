export const chainEvents = chain => {
    const CAN_SEND = Array.isArray(chain) && chain.length > 0

    if (CAN_SEND) {
        const
            element = chain[0],
            FULFILL = element.length === 2 && element[0] instanceof Function && Number.isInteger(element[1])

        if (FULFILL) {
            const
                currentCallback = element[0],
                DELAY = element[1]

            chain.shift()

            setTimeout(() => {
                currentCallback()
                chainEvents(chain)
            }, DELAY)
        }
        else throw new Error('chain data error!')
    }
}