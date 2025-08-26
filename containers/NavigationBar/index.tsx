

"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
    ShoppingCart,
    Menu,
    X,
    Search,
    Sun,
    Moon,
    ChevronDown,
} from "lucide-react";
import { useTheme } from "@/context/themeContext";
import { useCart } from "@/context/cartContext";
import { Tooltip } from "@mui/material";
import { categories } from "@/constant";
import useFilters from "@/hooks/useFilters";
import { useDebounce } from "@/hooks/useDebounce";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { filters, setFilters } = useFilters();
    const [searchTerm, setSearchTerm] = useState(filters?.["searchText"]?.[0] || '');
    const [sortOrder, setSortOrder] = useState("");
    const [showMobileSort, setShowMobileSort] = useState(false);
    const [showMobileCategories, setShowMobileCategories] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { count } = useCart();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
    };

    const handleCategorySelect = useCallback((category: string) => {
        setFilters([["category", [category]]]);
    }, [setFilters]);
    useEffect(() => {
        if (debouncedSearchTerm) {
            setFilters([["searchText", [debouncedSearchTerm]]]);
        } else {
            setFilters([["searchText", []]]);
        }
    }, [debouncedSearchTerm]);

    const handleSort = useCallback((order: string) => {
        setSortOrder(order);
        console.log("Sorting by:", order);
        setFilters([["sortOrder", [order]]]);
    }, [setSortOrder, setFilters]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 shadow-md transition-colors duration-300 ${theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
                }`}
        >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
                >
                    MyStore
                </Link>

                {/* Search Bar (Desktop) */}
                <form
                    onSubmit={handleSearch}
                    className="hidden md:flex items-center flex-1 mx-4 max-w-xl"
                >
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-300"
                            }`}
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </form>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 relative">
                    <Link href="/" className="hover:text-indigo-600">
                        Home
                    </Link>
                    <Tooltip
                        title={
                            <div
                                className={`px-[4px] py-[4px] w-max rounded-lg shadow-lg z-50 transition-colors duration-300 ${theme === "dark"
                                    ? "bg-gray-700 text-white"
                                    : "bg-white text-gray-900"
                                    }`}
                            >
                                <button
                                    onClick={() => handleSort("asc")}
                                    className="block w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white rounded-[8px] cursor-pointer"
                                >
                                    Price: Low to High
                                </button>
                                <button
                                    onClick={() => handleSort("desc")}
                                    className="block w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white rounded-[8px] cursor-pointer"
                                >
                                    Price: High to Low
                                </button>
                            </div>
                        }
                        slotProps={{
                            tooltip: {
                                sx: {
                                    padding: "0px",
                                    backgroundColor: "transparent",
                                },
                            },
                        }}
                    >
                        <div className="relative">
                            <button className="flex items-center gap-1 hover:text-indigo-600">
                                Sort <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </Tooltip>

                    {/* Categories Dropdown */}
                    <Tooltip
                        title={
                            <div
                                className={`px-[4px] py-[4px] w-48 rounded-lg shadow-lg z-50 transition-colors duration-300 ${theme === "dark"
                                    ? "bg-gray-700 text-white"
                                    : "bg-white text-gray-900"
                                    }`}
                            >
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() =>
                                            handleCategorySelect(cat)
                                        }
                                        className="block w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white rounded-[8px] cursor-pointer"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        }
                        slotProps={{
                            tooltip: {
                                sx: {
                                    padding: "0px",
                                    backgroundColor: "transparent",
                                },
                            },
                        }}
                    >
                        <div className="relative">
                            <button className="flex items-center gap-1 hover:text-indigo-600">
                                Categories <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </Tooltip>

                    {/* Cart */}
                    <Link href="/" className="relative">
                        <ShoppingCart className="w-6 h-6 hover:text-indigo-600" />
                        {count > 0 && (
                            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full px-1 min-w-5 text-center">
                                {count}
                            </span>
                        )}
                    </Link>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {theme === "light" ? (
                            <Moon className="w-5 h-5" />
                        ) : (
                            <Sun className="w-5 h-5 text-yellow-400" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div
                        className={`absolute top-full left-0 w-full md:hidden flex flex-col shadow-inner px-4 py-3 space-y-3 transition-colors duration-300 ${theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-gray-50 text-gray-900"
                            }`}
                    >
                        {/* Mobile Search */}
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center"
                        >
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                                className={`w-full px-3 py-2 border rounded-l-lg focus:outline-none ${theme === "dark"
                                    ? "bg-gray-700 border-gray-600 text-white"
                                    : "bg-white border-gray-300"
                                    }`}
                            />
                            <button
                                type="submit"
                                className="px-3 py-2 bg-indigo-600 text-white rounded-r-lg"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </form>

                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-indigo-600"
                        >
                            Home
                        </Link>

                        <button
                            onClick={() => setShowMobileCategories(!showMobileCategories)}
                            className="w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white rounded flex items-center justify-between"
                        >
                            Categories <ChevronDown className="w-4 h-4" />
                        </button>

                        {showMobileCategories && (
                            <div className="pl-6">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategorySelect(cat)}
                                        className="block w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white rounded"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => setShowMobileSort(!showMobileSort)}
                            className="w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white rounded flex items-center justify-between"
                        >
                            Sort By <ChevronDown className="w-4 h-4" />
                        </button>

                        {showMobileSort && (
                            <div className="pl-6">
                                <button
                                    onClick={() => handleSort("asc")}
                                    className="block w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white rounded"
                                >
                                    Price: Low to High
                                </button>
                                <button
                                    onClick={() => handleSort("desc")}
                                    className="block w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white rounded"
                                >
                                    Price: High to Low
                                </button>
                            </div>
                        )}
                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className="relative"
                        >
                            <ShoppingCart className="w-6 h-6 hover:text-indigo-600" />
                            {count > 0 && (
                                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full px-1 min-w-5 text-center">
                                    {count}
                                </span>
                            )}
                        </Link>

                        {/* Theme Toggle (with icon + label) */}
                        <button
                            onClick={() => {
                                toggleTheme();
                                setMenuOpen(false);
                            }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white"
                        >
                            {theme === "light" ? (
                                <>
                                    <Moon className="w-4 h-4" />
                                    Dark Mode
                                </>
                            ) : (
                                <>
                                    <Sun className="w-4 h-4" />
                                    Light Mode
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Mobile Menu Toggle Button */}
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>
        </nav>
    );
}
