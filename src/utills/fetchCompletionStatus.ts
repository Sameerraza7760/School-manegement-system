// export const fetchCompletionStatus = async () => {
//   const statusMap: Record<string, boolean> = {};
//   await Promise.all(
//     quizzes.map(async (quiz) => {
//       const isCompleted = await fetchQuizCompletionStatus(quiz.id);
//       statusMap[quiz.id] = isCompleted;
//     })
//   );
//   setCompletedQuizzes(statusMap);
// };
// const fetchCompletionStatus = async () => {
//     const statusMap: Record<string, boolean> = {};
//     if (assignments?.length > 0) {
//       await Promise.all(
//         assignments.map(async (assignment) => {
//           const isCompleted = await fetchAssignmentCompletionStatus(
//             assignment.assignmentId
//           );
//           statusMap[assignment.assignmentId] = isCompleted;
//         })
//       );
//     }
//     setCompletedAssignments(statusMap);
//   };