import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-6 bg-white dark:bg-gray-900">
      <div className="w-full max-w-[2000px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Softgen – a Spacedev Product</div>
          <div className="text-sm">
            <Link
              to="/terms"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Terms of Service & Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

