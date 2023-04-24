export default function countBy(arr) {
    return arr.reduce((acc, cur) => {
        if (!acc[cur])
            acc[cur] = 0;
        acc[cur] += 1;
        return acc;
    }, {});
}
//# sourceMappingURL=countBy.js.map