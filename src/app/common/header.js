import React, { useEffect, useState } from "react";
import Link from 'next/link';
import NavLink from 'next/link'
import { usePathname } from 'next/navigation'

import { Col, Collapse, Container, Dropdown, DropdownMenu, DropdownToggle, Nav, Navbar, NavItem, Row } from "reactstrap";

const Header = () => {
	const pathname = usePathname()
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [dropdownOpen3, setDropdownOpen3] = useState(false);
	const [dropdownOpen4, setDropdownOpen4] = useState(false);
	const [isMenu, setisMenu] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const toggle3 = () => setDropdownOpen3((prevState) => !prevState);
	const toggle4 = () => setDropdownOpen4((prevState) => !prevState);

	const handleScroll = () => {
		if (window.scrollY > 60) {
			document.querySelector(".landing-header").classList.add("fixed");
		} else {
			document.querySelector(".landing-header").classList.remove("fixed");
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div>
			<div className={`${pathname === '/landing' || pathname === '/' ? "theme-landing" : ""}`}>
				<header id="home" className='header'>
					<Container className="custom-container">
						<Row>
							<Col className="col-12">
								<div className="landing-header">
									<div className="main-menu">
										<Navbar className="navbar navbar-expand-xl navbar-light">
											<Link className="navbar-brand" href="/landing">
												<div className="logo-block">
													<img className="img-fluid" src="/assets/images/logo/landing-logo.png" alt="logo" />
												</div>
											</Link>
											<button className="navbar-toggler d-xl-none" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={isMenu} aria-label="Toggle navigation" onClick={() => setisMenu(!isMenu)}>
												<span className="navbar-toggler-icon"></span>
											</button>
											<Collapse className="navbar-collapse d-xl-block" id="navbarNav" isOpen={isMenu}>
												<Nav className="mr-auto" navbar>
													<NavItem className="active">
														<NavLink href="/messenger">Messenger</NavLink>
													</NavItem>
													{/* <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
														<DropdownToggle nav caret>Blog
														</DropdownToggle>
														<DropdownMenu>
															<Link href="/blog/rightSidebar">Blog Right sidebar</Link>
															<Link href="/blog/leftSidebar">Blog Left sidebar</Link>
															<Link href="/blog/detailSidebar">Blog Details</Link>
															<Link href="/blog/noSidebar">Blog No sidebar</Link>
														</DropdownMenu>
													</Dropdown>

													<Dropdown nav isOpen={dropdownOpen3} toggle={toggle3}>
														<DropdownToggle nav caret>Authentication</DropdownToggle>
														<DropdownMenu>
															<Link href="/auth/signIn">Signin</Link>
															<Link href="/auth/signInClassic">Signin Classic</Link>
															<Link href="/auth/signUp">Signup</Link>
															<Link href="/auth/signUpClassic">Signup Classic</Link>
														</DropdownMenu>
													</Dropdown>
													<Dropdown nav isOpen={dropdownOpen4} toggle={toggle4}>
														<DropdownToggle nav caret>Bouns page</DropdownToggle>
														<DropdownMenu>
															<Link href="/bonus/about">About</Link>
															<Link href="/bonus/faq">FAQ</Link>
															<Link href="/bonus/elements">Elements</Link>
															<Link href="/bonus/price">Price</Link>
														</DropdownMenu>
													</Dropdown> */}
												</Nav>
											</Collapse>
										</Navbar>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</header>
			</div>
		</div>
	);
};
export default Header;