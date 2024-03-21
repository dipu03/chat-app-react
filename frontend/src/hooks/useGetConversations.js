import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				let token = await localStorage.getItem("jwt");
				console.log("11111111111111111", token)
				const res = await fetch("https://chat-app-react-0zo5.onrender.com/api/users", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"jwt" : token
					},
				});
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
