import React from "react";
import { Link } from "react-router-dom";
import "react-chat-elements/dist/main.css";
import { MessageList, ChatList, Input } from "react-chat-elements";
import { useEffect, useState } from "react";
import {
	Container,
	Button,
	Form,
	Row,
	Col,
	Card,
	Image,
} from "react-bootstrap";
import Header from "../common/Header";
import endPointObj from "../../endPointUrl";
import axios from "axios";

const JobSeekerChats = () => {
	const [activeChat, setActiveChat] = useState("");
	const [jobSeekerId, setJobSeekerId] = useState(
		localStorage.getItem("userId")
	);
	const [messagesOverview, setMessagesOverview] = useState();
	const [chat, setChats] = useState([]);

	console.log("Messages overview: ", messagesOverview);

	const getMessagesOverview = async () => {
		try {
			// const response = await axios.get(
			// 	`http://${endPointObj.url}/job-seeker/get-messages/${jobSeekerId}`
			// );
			// console.log(
			// 	"Fetched response for getMessageOverview: ",
			// 	response.data
			// );
			// const res = response.data.messages;
			const res = [
				{
					employerId: "4",
					employerName: "John Doe",
					lastMessage: "Regarding your interview at Amazon",
					timestamp: "",
				},
				{
					employerId: "4",
					employerName: "Patricia Smith",
					lastMessage: "Congratulations! You have received an offer",
					timestamp: "",
				},
				{
					employerId: "4",
					employerName: "John Doe",
					lastMessage: "Regarding your interview at Amazon",
					timestamp: "",
				},
				{
					employerId: "4",
					employerName: "John Doe",
					lastMessage: "Regarding your interview at Amazon",
					timestamp: "",
				},
				{
					employerId: "4",
					employerName: "John Doe",
					lastMessage: "Regarding your interview at Amazon",
					timestamp: "",
				},
				{
					employerId: "4",
					employerName: "John Doe",
					lastMessage: "Regarding your interview at Amazon",
					timestamp: "",
				},
			];
			let dataSource = [];
			for (let i = 0; i < res.length; i++) {
				dataSource.push({
					...res[i],
					avatar: "",
					alt: "Employer",
					title: res[i].employerName,
					subtitle: res[i].lastMessage,
					date: new Date(),
					unread: 0,
				});
			}
			setMessagesOverview(dataSource);
		} catch (err) {
			console.error(err);
		}
	};
	const getChat = async (e) => {
		try {
			// const response = await axios.get(
			// 	`http://${endPointObj.url}/employer/get-chats/${e.employerId}/${jobSeekerId}`
			// );
			// console.log("Response of getChat function: ", response.data);
			// setChats(response.data.chats);
			// const res = response.data.chats
			const res = [
				{
					position: "right",
					type: "text",
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
					date: new Date(),
				},
				{
					position: "left",
					type: "text",
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
					date: new Date(),
				},
				{
					position: "right",
					type: "text",
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
					date: new Date(),
				},
				{
					position: "left",
					type: "text",
					text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
					date: new Date(),
				},
			];
			setChats(res);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		console.log("Rendering");
		getMessagesOverview();
	}, []);
	return (
		<>
			<Header />
			<Container
				fluid
				style={{ backgroundColor: "#f6f6f6" }}
				className="px-5"
			>
				<Row>
					<Col xs={4} className="p-3">
						<Container
							className="h-100 d-inline-block"
							style={{ backgroundColor: "white" }}
						>
							<ChatList
								className="chat-list"
								onClick={(e) => getChat(e)}
								dataSource={messagesOverview}
							/>
						</Container>
					</Col>
					<Col xs={8} className="p-3">
						<Container
							className="h-100 d-inline-block py-5"
							style={{ backgroundColor: "white" }}
						>
							{chat.length ? (
								<>
									<Row style={{ minHeight: "600px" }}>
										<MessageList
											className="message-list"
											lockable={true}
											toBottomHeight={"100%"}
											dataSource={chat}
										/>
									</Row>
									<Row className="border-top mt-1 pt-3">
										<Input
											placeholder="Type your message here .."
											multiline={true}
											rightButtons={
												<Button variant="success">
													Send
												</Button>
											}
										/>
									</Row>
								</>
							) : (
								<Row style={{ minHeight: "600px" }}>
									<Row>
										<Image
											src="https://uber-eats-prototype.s3.us-west-1.amazonaws.com/Screen%20Shot%202021-11-29%20at%208.23.28%20PM.png"
											style={{
												maxHeight: "200px",
												maxWidth: "400px",
												marginLeft: "250px",
												marginRight: "250px",
												marginTop: "150px",
												marginBottom: "0px",
											}}
										></Image>
										<p
											style={{
												justifyContent: "center",
												marginLeft: "350px",
												marginRight: "250px",
											}}
										>
											<b>You may have messages</b> <br />
											Select a conversation to read
										</p>
									</Row>
									{/* <Row
										style={{
											justifyContent: "center",
											marginTop: "0px",
										}}
									> */}

									{/* </Row> */}
									<Row
										style={{ justifyContent: "center" }}
									></Row>
								</Row>
							)}
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default JobSeekerChats;
