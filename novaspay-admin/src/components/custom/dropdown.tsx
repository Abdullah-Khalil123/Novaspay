'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Action = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  variant?: 'default' | 'destructive'; // allow styling
};

interface ActionsDropdownProps {
  label?: string; // dropdown label (optional)
  triggerLabel?: string; // button label
  actions: Action[];
}

const ActionsDropdown = ({
  label = 'Actions',
  triggerLabel = 'Actions',
  actions,
}: ActionsDropdownProps) => {
  const [pendingAction, setPendingAction] = useState<Action | null>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{triggerLabel}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
          {label && <DropdownMenuSeparator />}
          {actions.map((action, index) => {
            const isDestructive = action.variant === 'destructive';

            return (
              <DropdownMenuItem
                key={index}
                className={isDestructive ? 'text-red-600' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  if (isDestructive) {
                    setPendingAction(action);
                  } else {
                    action.onClick();
                  }
                }}
                disabled={action.disabled}
              >
                {action.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={!!pendingAction}
        onOpenChange={(open) => !open && setPendingAction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingAction(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                pendingAction?.onClick();
                setPendingAction(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActionsDropdown;
