export const useIntersection =
    (index: number, visibleItems: Set<number>) =>
    (isVisible: boolean): Ref => {
        if (isVisible) {
            visibleItems.add(index)
        } else {
            visibleItems.delete(index)
        }
        return ref()
    }
