function Footer() {
    return (
        <footer className="bg-body-secondary py-3">
            <div className="container-xxl border-black border-top">
                <p className="mb-0 text-body-secondary text-center">© {new Date().getFullYear()} Company, Inc</p>
            </div>
        </footer>
    );
}

export {Footer}