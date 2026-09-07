// resources/js/components/common/EmptyState.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Plus, UserX, FilterX } from 'lucide-react';

export default function EmptyState({
    type = 'no-data', // 'no-data' | 'not-found'
    onClearFilters,
    onCreateRecord,
    canCreateRecord = false,
    searchTerm = '',
    className = ''
}) {
    const isNotFound = type === 'not-found';

    // Check if any search term exists
    const hasSearchTerm = searchTerm && searchTerm.trim().length > 0;

    return (
        <div className={`rounded-2xl border border-gray-200 bg-white p-8 md:p-12 shadow-sm ${className}`}>
            <div className="flex flex-col items-center justify-center text-center">
                {/* Icon Container */}
                <div className="relative mb-6">
                    <div className="rounded-full bg-gradient-to-br from-gray-50 to-gray-100 p-5">
                        {isNotFound ? (
                            <UserX className="h-14 w-14 text-gray-400" strokeWidth={1.5} />
                        ) : (
                            <Search className="h-14 w-14 text-gray-400" strokeWidth={1.5} />
                        )}
                    </div>
                    {isNotFound && hasSearchTerm && (
                        <div className="absolute -top-2 -right-2 rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-lg">
                            !
                        </div>
                    )}
                </div>

                {isNotFound ? (
                    // "This Individual Is Not In The Database" মেসেজ
                    <>
                        <h3 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl tracking-tight">
                            This Individual Is Not In The Database
                        </h3>
                        <div className="max-w-md mx-auto">
                            <p className="text-sm text-gray-500 leading-relaxed">
                                We couldn't find any records matching your search criteria.
                            </p>
                            {hasSearchTerm && (
                                <p className="mt-1 text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1 rounded-full inline-block">
                                    Search: "{searchTerm}"
                                </p>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                Please try different keywords or filters.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 flex-wrap justify-center">
                            <Button
                                onClick={onClearFilters}
                                className="bg-navy-700 hover:bg-navy-800 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                <FilterX className="h-4 w-4" />
                                Clear All Filters
                            </Button>
                            {canCreateRecord && (
                                <Button
                                    onClick={onCreateRecord}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Create New Record
                                </Button>
                            )}
                        </div>
                    </>
                ) : (
                    // সাধারণ Empty State
                    <>
                        <h3 className="mb-2 text-xl font-semibold text-gray-700 md:text-2xl">
                            No Records Found
                        </h3>
                        <p className="text-sm text-gray-500 max-w-sm">
                            Start by creating your first record to get started.
                        </p>
                        {canCreateRecord && (
                            <Button
                                onClick={onCreateRecord}
                                className="mt-6 bg-navy-700 hover:bg-navy-800 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Create Record
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
