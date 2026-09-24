const extractWholeNumber = (input: string) => {
    const match = input.match(/\b\d+\b/);
    return match ? match[0] : null;
};

export default extractWholeNumber;
