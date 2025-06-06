import React from "react";

interface HeaderProps {
    username: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
    return (
        <nav className="flex min-h-[56px] w-full justify-between items-center p-2.5 bg-white rounded-full shadow-xl">
            <div className="flex items-center gap-6">
                <button className="flex items-center">
                    <img
                        src={"https://main.exchange/_next/static/media/main.c5981f64.svg"}
                        alt="Logo"
                        className="lg:ml-4 ml-2"
                        width={72}
                    />
                </button>
            </div>
            {username ? (
                <div className="flex items-center gap-4 rounded-full p-2 bg-background px-4">
                    <span className="text-black">@{username}</span>
                </div>
            ) : null}
        </nav>
    );
};

export default Header;
