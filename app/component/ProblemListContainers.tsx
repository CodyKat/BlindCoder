import Link from "next/link";

const ListContainer = ({ problems }) => {
    return (
        <div className="problemlist-table-container">
            <table className="problemlist-table">
                <thead>
                    <tr>
                        <th className="id-column">ID</th>
                        <th className="title-column">제목</th>
                        <th className="description">설명</th>
                        <th className="correct-count">맞힌 사람</th>
                        <th className="submit">제출</th>
                        <th className="correct-rate">정답 비율</th>
                        <th className="correct-time-average">평균 통과 시간</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem) => (
                        <tr key={problem.id}>
                            <td>{problem.id}</td>
                            <td>
                                <Link href={`/problem/${problem.id}`}>
                                    {problem.title}
                                </Link>
                            </td>
                            <td>{problem.description}</td>
                            <td>{problem.correct}</td>
                            <td>{problem.submit}</td>
                            <td>{problem.correctRate}</td>
                            <td>{problem.correctTimeAverage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default ListContainer;