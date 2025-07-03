function solveApartement(A, B, N, M, K) {
    /**
        * @param {number[]} A - Array of integers representing the minimum apartment sizes each applicant desires.
        * @param {number[]} B - Array of integers representing the sizes of available apartments.
        * @param {number} N - Number of applicants (length of array A).
        * @param {number} M - Number of available apartments (length of array B).
        * @param {number} K - Maximum allowable size difference for a valid match.
        * @returns {number} - Maximum number of apartments that can be allocated to applicants.
    */
    
    let ans = 0
    for (let aplicantIdx = 0; aplicantIdx < A.length; aplicantIdx++) {
        for (let availableIdx = 0; availableIdx < B.length; availableIdx++) {
            if (Math.abs(A[aplicantIdx] - B[availableIdx]) <= K) {
                ans++
                aplicantIdx++
            } else {
                availableIdx++
            }
        }
    }
    return ans;
}

module.exports = { solveApartement };
